```javascript
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "next-auth-account";
import { connectToMasterDB } from "lib/mongo.lib.ts";
import { SUPER_ADMIN } from "constants/user";
import { COMPANY_NAME, USER_ID, USER_NAME } from "constants/search";

const handler = async (req, res) => {
  const { method, query } = req;
  const { user } = await getServerSession(req, res, nextAuthOptions);

  if (!user) {
    return res.status(401).end();
  }

  if (user.userType !== SUPER_ADMIN) {
    return res.status(403).end();
  }

  const mongoClient = await connectToMasterDB();

  if (method === "GET") {
    try {
      const { page, pageSize, searchType, searchWord } = query;

      const search = RegExp(searchWord, "i");

      const pipeline = [
        {
          $match: {
            product: "human",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            id: "$userInfo.id",
            name: "$userInfo.name",
            companyId: "$userInfo.companyId",
            createdAt: "$userInfo.createdAt",
          },
        },
      ];

      // eslint-disable-next-line default-case
      switch (searchType) {
        case COMPANY_NAME:
          const companies = await mongoClient.aihumansDB
            .collection("companies")
            .find(
              { name: search },
              {
                projection: { _id: 1 },
              }
            )
            .toArray();
          pipeline.push({
            $match: { companyId: { $in: companies.map(({ _id }) => _id) } },
          });
          break;
        case USER_ID:
          pipeline.push({ $match: { id: search } });
          break;
        case USER_NAME:
          pipeline.push({ $match: { name: search } });
          break;
      }

      pipeline.push({
        $facet: {
          total: [
            {
              $count: "count",
            },
          ],
          items: [
            {
              $sort: { createdAt: -1 },
            },
            {
              $skip: (page - 1) * pageSize,
            },
            {
              $limit: +pageSize,
            },
          ],
        },
      });

      const result = await mongoClient.aihumansDB
        .collection("users_products")
        .aggregate(pipeline)
        .toArray();

      console.log("result", result);

      const total = result[0].total[0].count;
      const users = result[0].items;

      const subscriptions = await mongoClient.paymentsDB
        .collection("subscriptions")
        .aggregate([
          {
            $match: {
              product: "human",
              userId: { $in: users.map((_user) => _user.id) },
            },
          },
          {
            $lookup: {
              from: "plans",
              localField: "planId",
              foreignField: "_id",
              as: "plans",
            },
          },
          {
            $unwind: "$plans",
          },
          {
            $project: {
              userId: 1,
              product: 1,
              plan: 1,
              constraints: "$plans.constraints",
            },
          },
        ])
        .toArray();

      const credits = await mongoClient.paymentsDB
        .collection("credits")
        .find({
          product: "human",
          userId: { $in: users.map((_user) => _user.id) },
        })
        .toArray();

      console.log("credits", JSON.stringify(credits));

      for (let i = 0; i < users.length; i++) {
        users[i].subscription = null;
        users[i].credit = 0;
        users[i].usedSentences = 0;

        for (let j = 0; j < subscriptions.length; j++) {
          if (users[i].id === subscriptions[j].userId) {
            users[i].subscription = subscriptions[j];
          }
        }

        for (let k = 0; k < credits.length; k++) {
          if (users[i].id === credits[k].userId) {
            users[i].credit = credits[k].credit.numberOfSentences;
          }
        }

        let usages;
        if (users[i].subscription) {
          usages = await mongoClient.aihumansDB
            .collection("usages")
            .aggregate([
              {
                $match: {
                  $and: [
                    {
                      id: users[i].id,
                    },
                    {
                      service: "AI Human",
                    },
                    {
                      createdAt: {
                        $gte: users[i].subscription.servicePeriodStart,
                        $lt: users[i].subscription.servicePeriodEnd,
                      },
                    },
                  ],
                },
              },
              { $group: { _id: null, sumOfSentence: { $sum: "$ammount" } } },
            ])
            .toArray();
        } else {
          usages = await mongoClient.aihumansDB
            .collection("usages")
            .find({
              id: users[i].id,
              service: "human",
            })
            .toArray();
        }

        users[i].usedSentences =
          usages.length === 0 ? 0 : usages[0].sumOfSentence;

        users[i].totalSentences = users[i].subscription
          ? users[i].subscription.constraints.numberOfSentences
          : 10;
        users[i].totalSentences += users[i].credit;
      }

      console.log(
        "returning",
        total,

        JSON.parse(JSON.stringify(users))
      );
      return res.status(200).json({
        total,
        data: JSON.parse(JSON.stringify(users)),
      });
    } catch (err) {
      console.log("Users GET Error", err);
      return res.status(500).end();
    }
  } else {
    return res.status(405).end();
  }
};

export default handler;
```
