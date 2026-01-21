import { Client as WorkflowClientClass } from '@upstash/workflow'
import config from "./config"

export const WorkflowClient = new WorkflowClientClass({
    baseUrl: config.env.qstashUrl,
    token: config.env.qstashToken
})