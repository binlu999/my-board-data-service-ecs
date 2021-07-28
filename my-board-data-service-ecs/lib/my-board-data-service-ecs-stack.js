"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyBoardDataServiceEcsStack = void 0;
const cdk = require("@aws-cdk/core");
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
class MyBoardDataServiceEcsStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // VPC
        const vpc = new aws_ec2_1.Vpc(this, "my-board-VPC", {
            maxAzs: 2,
            natGateways: 1,
        });
        // Fargate cluster
        const cluster = new ecs.Cluster(this, "my-board-Cluster", {
            vpc: vpc,
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
exports.MyBoardDataServiceEcsStack = MyBoardDataServiceEcsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYm9hcmQtZGF0YS1zZXJ2aWNlLWVjcy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWJvYXJkLWRhdGEtc2VydmljZS1lY3Mtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUF1QztBQUN2Qyx3Q0FBd0M7QUFDeEMsMERBQTBEO0FBRTFELE1BQWEsMEJBQTJCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDdkQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFDN0MsTUFBTTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDeEMsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ3hELEdBQUcsRUFBRSxHQUFVO1NBQ2hCLENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDN0csT0FBTyxFQUFFLE9BQU87WUFDaEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsR0FBRyxFQUFFLEdBQUc7WUFDUixZQUFZLEVBQUUsQ0FBQztZQUNmLGdCQUFnQixFQUFFO2dCQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUNqRCxXQUFXLEVBQUU7b0JBQ1gsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxlQUFlO1FBQ2YsY0FBYyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLG9CQUFvQjtRQUNwQixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3pDLEtBQUssRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLG1CQUFtQjtZQUN0RCxVQUFVLEVBQUUsaUJBQWlCO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXZDRCxnRUF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBWcGMgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWVjMlwiO1xuaW1wb3J0ICogYXMgZWNzIGZyb20gXCJAYXdzLWNkay9hd3MtZWNzXCI7XG5pbXBvcnQgKiBhcyBlY3NfcGF0dGVybnMgZnJvbSBcIkBhd3MtY2RrL2F3cy1lY3MtcGF0dGVybnNcIjtcblxuZXhwb3J0IGNsYXNzIE15Qm9hcmREYXRhU2VydmljZUVjc1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICAgIC8vIFZQQ1xuICAgIGNvbnN0IHZwYyA9IG5ldyBWcGModGhpcywgXCJteS1ib2FyZC1WUENcIiwge1xuICAgICAgbWF4QXpzOiAyLFxuICAgICAgbmF0R2F0ZXdheXM6IDEsXG4gICAgfSk7XG5cbiAgICAvLyBGYXJnYXRlIGNsdXN0ZXJcbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsIFwibXktYm9hcmQtQ2x1c3RlclwiLCB7XG4gICAgICB2cGM6IHZwYyBhcyBhbnksXG4gICAgfSk7XG5cbiAgICAvLyBGYXJnYXRlIHNlcnZpY2VcbiAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IG5ldyBlY3NfcGF0dGVybnMuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZSh0aGlzLCBcIm15LWJvYXJkLWJhY2tlbmRTZXJ2aWNlXCIsIHtcbiAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIsXG4gICAgICBtZW1vcnlMaW1pdE1pQjogMTAyNCxcbiAgICAgIGNwdTogNTEyLFxuICAgICAgZGVzaXJlZENvdW50OiAyLFxuICAgICAgdGFza0ltYWdlT3B0aW9uczoge1xuICAgICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21Bc3NldChcIi4vYmFja2VuZC9cIiksXG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgbXlWYXI6IFwidmFyaWFibGUwMVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIEhlYWx0aCBjaGVja1xuICAgIGJhY2tlbmRTZXJ2aWNlLnRhcmdldEdyb3VwLmNvbmZpZ3VyZUhlYWx0aENoZWNrKHsgcGF0aDogXCIvaGVhbHRoXCIgfSk7XG5cbiAgICAvLyBMb2FkIGJhbGFuY2VyIHVybFxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwibG9hZEJhbGFuY2VyVXJsXCIsIHtcbiAgICAgIHZhbHVlOiBiYWNrZW5kU2VydmljZS5sb2FkQmFsYW5jZXIubG9hZEJhbGFuY2VyRG5zTmFtZSxcbiAgICAgIGV4cG9ydE5hbWU6IFwibG9hZEJhbGFuY2VyVXJsXCIsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==