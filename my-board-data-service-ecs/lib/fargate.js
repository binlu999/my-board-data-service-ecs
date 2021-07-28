"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FargateDemoStack = void 0;
const cdk = require("@aws-cdk/core");
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
class FargateDemoStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
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
                image: ecs.ContainerImage.fromAsset("../backend/"),
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
exports.FargateDemoStack = FargateDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFyZ2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZhcmdhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUF1QztBQUN2Qyx3Q0FBd0M7QUFDeEMsMERBQTBEO0FBRTFELE1BQWEsZ0JBQWlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDN0MsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNO1FBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN4QyxNQUFNLEVBQUUsQ0FBQztZQUNULFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDeEQsR0FBRyxFQUFFLEdBQVU7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBQ2xCLE1BQU0sY0FBYyxHQUFHLElBQUksWUFBWSxDQUFDLHFDQUFxQyxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUM3RyxPQUFPLEVBQUUsT0FBTztZQUNoQixjQUFjLEVBQUUsSUFBSTtZQUNwQixHQUFHLEVBQUUsR0FBRztZQUNSLFlBQVksRUFBRSxDQUFDO1lBQ2YsZ0JBQWdCLEVBQUU7Z0JBQ2hCLEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Z0JBQ2xELFdBQVcsRUFBRTtvQkFDWCxLQUFLLEVBQUUsWUFBWTtpQkFDcEI7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILGVBQWU7UUFDZixjQUFjLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFckUsb0JBQW9CO1FBQ3BCLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDekMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsbUJBQW1CO1lBQ3RELFVBQVUsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdENELDRDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQgeyBWcGMgfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWVjMlwiO1xyXG5pbXBvcnQgKiBhcyBlY3MgZnJvbSBcIkBhd3MtY2RrL2F3cy1lY3NcIjtcclxuaW1wb3J0ICogYXMgZWNzX3BhdHRlcm5zIGZyb20gXCJAYXdzLWNkay9hd3MtZWNzLXBhdHRlcm5zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFyZ2F0ZURlbW9TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gICAgXHJcbiAgICAvLyBWUENcclxuICAgIGNvbnN0IHZwYyA9IG5ldyBWcGModGhpcywgXCJteS1ib2FyZC1WUENcIiwge1xyXG4gICAgICBtYXhBenM6IDIsXHJcbiAgICAgIG5hdEdhdGV3YXlzOiAxLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmFyZ2F0ZSBjbHVzdGVyXHJcbiAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsIFwibXktYm9hcmQtQ2x1c3RlclwiLCB7XHJcbiAgICAgIHZwYzogdnBjIGFzIGFueSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZhcmdhdGUgc2VydmljZVxyXG4gICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSBuZXcgZWNzX3BhdHRlcm5zLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VkRmFyZ2F0ZVNlcnZpY2UodGhpcywgXCJteS1ib2FyZC1iYWNrZW5kU2VydmljZVwiLCB7XHJcbiAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIsXHJcbiAgICAgIG1lbW9yeUxpbWl0TWlCOiAxMDI0LFxyXG4gICAgICBjcHU6IDUxMixcclxuICAgICAgZGVzaXJlZENvdW50OiAyLFxyXG4gICAgICB0YXNrSW1hZ2VPcHRpb25zOiB7XHJcbiAgICAgICAgaW1hZ2U6IGVjcy5Db250YWluZXJJbWFnZS5mcm9tQXNzZXQoXCIuLi9iYWNrZW5kL1wiKSxcclxuICAgICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgICAgbXlWYXI6IFwidmFyaWFibGUwMVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIZWFsdGggY2hlY2tcclxuICAgIGJhY2tlbmRTZXJ2aWNlLnRhcmdldEdyb3VwLmNvbmZpZ3VyZUhlYWx0aENoZWNrKHsgcGF0aDogXCIvaGVhbHRoXCIgfSk7XHJcblxyXG4gICAgLy8gTG9hZCBiYWxhbmNlciB1cmxcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwibG9hZEJhbGFuY2VyVXJsXCIsIHtcclxuICAgICAgdmFsdWU6IGJhY2tlbmRTZXJ2aWNlLmxvYWRCYWxhbmNlci5sb2FkQmFsYW5jZXJEbnNOYW1lLFxyXG4gICAgICBleHBvcnROYW1lOiBcImxvYWRCYWxhbmNlclVybFwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19