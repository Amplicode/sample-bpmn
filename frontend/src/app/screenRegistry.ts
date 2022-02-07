import { PolicyTypeList } from "./policytype/PolicyTypeList";
import { PolicyList } from "./policy/PolicyList";
import { ClaimList } from "./claim/ClaimList";
import { PolicyholderList } from "./policyholder/PolicyholderList";
import { Home } from "./home/Home";
import { screenStore } from "@amplicode/react-core";
import {TaskList} from "./tasklist/TaskList";

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

screenStore.registerScreen("task-list", {
  component: TaskList,
  captionKey: "screen.TaskList"
});
