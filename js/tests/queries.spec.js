import { test, expect } from '@playwright/test'
import axios from 'axios';
import { MongoClient, ObjectId } from 'mongodb'

export const ENDPOINT = "http://localhost:4000/graphql"

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
const mongoClient = new MongoClient(uri)
const database = mongoClient.db('aiverify')
export const projects = database.collection('projecttemplatemodels');

// GraphQL Query
const GET_PROJECTS = `query Query {
  projects {
    projectInfo {
      company
      description
      name
      reportTitle
    }
  }
}`

export const GET_PROJECT_BY_ID = `query Query($projectId: ObjectID!) {
  project(id: $projectId) {
    projectInfo {
      name
      description
      company
      reportTitle
    }
  }
}`

export const GET_REPORT_BY_PROJECT_ID = `query Query($projectId: ObjectID!) {
  report(projectID: $projectId) {
    projectID
    status
    timeStart
    timeTaken
    totalTestTimeTaken
    inputBlockData
  }
}`

test.describe('Get All Projects', () => {

  test.skip('Get All Projects Successfully', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_PROJECTS
    })
  
    const output = response.data.data.projects

    // Get a Project Info directly from MongoDB
    const query = { projectInfo: { name: 'Test 3', company: 'Testing Company 3' } };
    const projectInfoObj = await projects.findOne(query)
  
    // Assert Response
    expect(output[0].projectInfo.name).toBe(projectInfoObj.projectInfo.name)
    expect(output[0].projectInfo.company).toBe(projectInfoObj.projectInfo.company)
  })

  test.skip('Get All Projects Unsuccessfully', async () => {
    const response = await axios.post(ENDPOINT, {
      query: GET_PROJECTS
    })
  
    const output = response.data.errors

    //Assert Response
    expect(output[0].extensions.code).toBe('BAD_USER_INPUT')
  })

})

test.describe("Get Project By Id", () => {

  test('Get Projects By Id Successfully', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_PROJECT_BY_ID,
      variables: {
        "projectId": "63b518f4c05b0b2df748f418"
      }
    })
  
    const output = response.data.data.project

    // Get Project Info directly from MongoDB
    const query = { _id: ObjectId("63b518f4c05b0b2df748f418") }
    const projectInfoObj = await projects.findOne(query)
  
    // Assert Response
    expect(output.projectInfo.name).toBe(projectInfoObj.projectInfo.name)
    expect(output.projectInfo.company).toBe(projectInfoObj.projectInfo.company)
  })

  test('Get Projects By ID Unsuccessfully', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_PROJECT_BY_ID,
      variables: {
        "projectId": "123"
      }
    })

    const errorMessage = response.data.errors
  
    // Assert Response
    expect(errorMessage[0].extensions.code).toBe('BAD_USER_INPUT')
  })
})

test.describe('Get Report By Project ID', () => {

  test('Get Report By Project ID Successfully', async () => {
    
    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": "63c8f713d58c0b0dc5dfea90"
      }
    })
    
    const reportInfo = response.data.data.report

    // Assert Response
    expect(reportInfo).toHaveCount
  })

  test.skip('Invalid ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": "63b518f4c05b0b2df748f418"
      }
    })

    const errorMessage = response.data.errors //to check

    // Get Report Info directly from MongoDB
    const query = { _id: ObjectId("63b518f4c05b0b2df748f418") }
    const reportInfoObj = await projects.findOne(query)

    // Assert Response
    expect(errorMessage[0].extensions.code).toBe('INTERNAL_SERVER_ERROR')
    expect(reportInfoObj.report).toBeNull
  })

  test.skip('Invalid Algo', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": "63b518f4c05b0b2df748f418"
      }
    })

    const errorMessage = response.data.errors //to check

    // Get Report Info directly from MongoDB
    const query = { _id: ObjectId("63b518f4c05b0b2df748f418") }
    const reportInfoObj = await projects.findOne(query)

    // Assert Response
    expect(errorMessage[0].extensions.code).toBe('INTERNAL_SERVER_ERROR')
    expect(reportInfoObj.report).toBeNull
  })
})