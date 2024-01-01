import Section from "@/components/common/Section";
import Header from "../(home)/components/Header";
import Profile from "./components/Profile";
import PostList from "./components/PostList";
import CodeBox from "@/components/common/CodeBox";

function Main() {
  return (
    <>
      <Header />
      <Section title={"test"}>
        <div
          style={{
            height: "60px",
          }}
        ></div>
        {/* <CodeBox /> */}

        <Profile />
        <div
          style={{
            height: "60px",
          }}
        ></div>
        <PostList title={<>Posts</>} />
      </Section>
    </>
  );
}

export default Main;
