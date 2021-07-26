import * as cdk from '@aws-cdk/core';
import { Vpc } from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class MyBoardDataServiceEcsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // VPC
    const vpc = new Vpc(this, "my-board-VPC", {
      maxAzs: 2,
      natGateways: 1,
    });

    // Fargate cluster
    const cluster = new ecs.Cluster(this, "my-board-Cluster", {
      vpc: vpc as any,
    });

    // Fargate service
    const backendService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "my-board-backendService", {
      cluster: cluster,
      memoryLimitMiB: 1024,
      cpu: 512,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("./backend/"),
        environment: {
          myVar: "variable01",
        },
      },
    });

    // Health check
    backendService.targetGroup.configureHealthCheck({ path: "/health" });

    // Load balancer url
    new cdk.CfnOutput(this, "loadBalancerUrl", {
      value: backendService.loadBalancer.loadBalancerDnsName,
      exportName: "loadBalancerUrl",
    });
  }
}
