import { PolicyTypeList } from "./policytype/PolicyTypeList";
import { PolicyList } from "./policy/PolicyList";
import { ClaimList } from "./claim/ClaimList";
import { PolicyholderList } from "./policyholder/PolicyholderList";
import { Home } from "./home/Home";
import { screenStore } from "@amplicode/react-core";
import {NotificationTaskList} from "./tasklist/NotificationTaskList";
import {AssessmentTaskList} from "./tasklist/AssessmentTaskList";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: "screen.home"
});

screenStore.registerScreen("policyholder-list", {
  component: PolicyholderList,
  captionKey: "screen.PolicyholderList"
});

screenStore.registerScreen("claim-list", {
  component: ClaimList,
  captionKey: "screen.ClaimList"
});

screenStore.registerScreen("policy-list", {
  component: PolicyList,
  captionKey: "screen.PolicyList"
});

screenStore.registerScreen("policy-type-list", {
  component: PolicyTypeList,
  captionKey: "screen.PolicyTypeList"
});

screenStore.registerScreen("notification-task-list", {
  component: NotificationTaskList,
  captionKey: "screen.NotificationTaskList"
});

screenStore.registerScreen("assessment-task-list", {
  component: AssessmentTaskList,
  captionKey: "screen.AssessmentTaskList"
});
