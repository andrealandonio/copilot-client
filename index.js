const commandLineUsage = require('command-line-usage');
const CopilotApiClient = require('@condenast/copilot-api-client').default;
const winston = require('winston');

// Read env variables
copilotApiBaseUrl = (process.env.COPILOT_API_BASEURL !== undefined) ? process.env.COPILOT_API_BASEURL : 'http://lacucinaitaliana-service.local:8080';
copilotAuthId = (process.env.COPILOT_AUTH_ID !== undefined) ? process.env.COPILOT_AUTH_ID : 'foo';
copilotAuthKey = (process.env.COPILOT_AUTH_KEY !== undefined) ? process.env.COPILOT_AUTH_KEY : 'bar';

// Prepare client
const client = new CopilotApiClient(copilotApiBaseUrl, copilotAuthId, copilotAuthKey, winston);

// Read input params
var args = process.argv.slice(2);
var method = args[0];
var collection = args[1];
var payload = args[2];
var value = args[3];

// Output the params
if (method !== undefined) {
    console.log("PARAMETERS");
    console.log("*****************************");
    console.log("method: " + method);
    console.log("collection: " + collection);
    console.log("payload: " + payload);
    console.log("value: " + value);
}


// Manage methods
switch (method) {
    case 'create':
        // Create entity
        // create(collectionName: string, payload: any) => Promise<CopilotEntity>
        // example: node index create articles '{"hed": "Hello World"}'
        // example: node index create categories '{"name": "Hello World", "slug": "hello-world"}'
        const created = client.create(collection, JSON.parse(payload));
        created.then((createdEntity) => {console.log("id: " + createdEntity.id);});
        break;
    case 'update':
        // Update entity
        // update(collectionName: string, id: string, payload: any) => Promise<CopilotEntity>
        // example: node index update articles '{"hed": "Hello NEW"}' 5cfa38bb113f2630011ede26
        const updated = client.update(collection, value, JSON.parse(payload));
        updated.then((updatedEntity) => {console.log("id: " + updatedEntity.id);});
        break;
    case 'publish':
        // Publish entity
        // publish(collectionName: string, uuid: string, publishOptions: {uri: string, pubDate: Date, revision: number, revisionAuthor: string}) => Promise<CopilotEntity>
        // example: node index publish articles 'articles/hello-world' 5cfa38bb113f2630011edea6
        const published = client.publish(collection, value, {
            uri: payload,
            pubDate: new Date(),
            revision: 0
        });
        published.then((publishedEntity) => {console.log("id: " + publishedEntity.id);});
        break;
    case 'getCategory':
        // Get category
        // getCategory(slug: string, options: any = {}) => Promise<MaybeNull<CopilotEntity>>
        // example: node index getCategory '' '' 'my-slug'
        const getCategoryResult = client.getCategory(value);
        getCategoryResult.then((getCategoryEntity) => {console.log("id: " + getCategoryEntity.id);});
        break;
    case 'createChildCategory':
        // Create child category
        // example: node index createChildCategory categories '{"name": "New child", "slug": "new-child"}' 'trends'
        const createChildCategoryResult = client.create(collection, JSON.parse(payload));
        createChildCategoryResult.then((createChildCategoryEntity) => {
            console.log("id: " + createChildCategoryEntity.id);

            const parentCategory = client.getCategory(value);
            parentCategory.then((parentCategoryEntity) => {
                console.log("parent: " + parentCategoryEntity.id);

                client.relate(collection, createChildCategoryEntity.id, {
                    parent: [ parentCategoryEntity ]
                });
            });
        });
        break;
    default:
        // Show usage
        const sections = [
            {
                header: 'Copilot client',
                content: [
                    'A sample client app for work with Copilot API.',
                    'Using env variables you can change COPILOT_API_BASEURL, COPILOT_AUTH_ID and COPILOT_AUTH_KEY.'
                ]
            },
            {
                header: 'Parameters',
                optionList: [
                    {
                        name: 'method',
                        description: 'The method to use'
                    },
                    {
                        name: 'collection',
                        description: 'The collection to manage'
                    },
                    {
                        name: 'payload',
                        description: 'The method payload data or message'
                    },
                    {
                        name: 'value',
                        description: 'A generic value (id, uuid, slug, etc)'
                    }
                ]
            },
            {
                header: 'Methods',
                optionList: [
                    {
                        name: 'create',
                        description: ''
                    },
                    {
                        name: 'update',
                        description: ''
                    },
                    {
                        name: 'publish',
                        description: ''
                    },
                    {
                        name: 'getCategory',
                        description: ''
                    },
                    {
                        name: 'createChildCategory',
                        description: ''
                    }
                ]
            }
        ];
        console.log(commandLineUsage(sections));
        break;
}
