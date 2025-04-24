## studio

```yaml
spec:
  advanced:
    horizontalPodAutoscalerConfig:
      behavior:
        scaleDown:
          stabilizationWindowSeconds: 300
        scaleUp:
          stabilizationWindowSeconds: 180
    scalingModifiers: {}
  cooldownPeriod: 300
  maxReplicaCount: 3
  minReplicaCount: 2
  pollingInterval: 60
  scaleTargetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: ai-studio-v3-rollout
  triggers:
    - metadata:
        value: '70'
      metricType: Utilization
      type: cpu
```

- minReplicaCount: 배포의 최소 복제본 수를 정의합니다. 이 값은 2로 설정되어 있습니다. 즉, 스케일링 조건이 맞지 않더라도 최소한 2개의 복제본이 항상 실행됩니다.
- maxReplicaCount: 배포의 최대 복제본 수를 정의합니다. 이 값은 3으로 설정되어 있습니다. 즉, CPU 사용량에 따라 스케일링이 이루어지면 최대 3개의 복제본까지 늘어날 수 있습니다.
- cooldownPeriod: **300초 (5분)**로 설정되어 있습니다. 쿨다운 기간은 스케일링 작업 후, KEDA가 추가 스케일링을 고려하기 전에 기다리는 시간입니다. 이 설정은 잦은 스케일링을 방지합니다.
- pollingInterval: 60초로 설정되어 있습니다. 이는 KEDA가 스케일링 기준인 CPU 사용량을 체크하는 주기를 의미합니다. 이 간격마다 KEDA가 스케일링 여부를 결정합니다.
- triggers: 스케일링을 트리거하는 기준은 CPU 사용량입니다. Utilization 유형으로 설정되어 있고, 기준값은 **70%**로 설정되어 있습니다. CPU 사용량이 70%를 초과하면 KEDA가 스케일링 작업을 수행합니다. 이 트리거가 활성화되면 스케일링이 이루어지며, 설정된 최소 및 최대 복제본 수에 따라 조정됩니다.
- horizontalPodAutoscalerConfig.scaleDown: 스케일 다운의 안정화 기간을 **300초 (5분)**로 설정하여, 한 번 스케일 다운이 이루어진 후 5분 동안 추가로 스케일 다운하지 않도록 합니다.
- horizontalPodAutoscalerConfig.scaleUp: 스케일 업의 안정화 기간을 **180초 (3분)**으로 설정하여, 빠르게 여러 번 스케일 업이 이루어지지 않도록 합니다.
