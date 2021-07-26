import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as MyBoardDataServiceEcs from '../lib/my-board-data-service-ecs-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MyBoardDataServiceEcs.MyBoardDataServiceEcsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
