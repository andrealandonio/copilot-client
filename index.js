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

// Please setup constant before start a BULK operation
const channelId = '5d03a96319d1321d6d2f0c37';
const channelSlug = 'trends/events/';
const channelName = 'Trends';
const subChannelName = 'Events';
const tagId = '5d03a66f19d132b6e12f0c22';
const tagName = 'Tag1';
const typeId = '5d03a59619d1327e282f0c1f';
const layoutId = '5d03a75619d13249962f0c26';
const photoId = '5d0770f419d132d3442f0c4a';
const authorId = '5c944d3c0be26d08c5467aa2';
const lang = 'en-US';
const customAdvertisementZone = '';
const revisionAuthor = 'Andrea Landonio';
const hed = 'Sample article ';
const dek = 'Duis mollis mi odio, a ultricies tortor rutrum quis. Nulla ut libero malesuada, vulputate dolor ut, condimentum lorem';
const body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed pellentesque nisi. Donec ut pulvinar velit. Pellentesque aliquet purus nisi, sit amet vestibulum augue consectetur et. Nulla commodo, est in suscipit mattis, metus enim accumsan neque, sit amet lacinia magna tellus ac quam. Nunc sit amet diam pulvinar, sodales nibh quis, tristique sem. Phasellus vel finibus enim. Praesent a porttitor purus. Cras aliquam vestibulum cursus. Duis mollis mi odio, a ultricies tortor rutrum quis. Nulla ut libero malesuada, vulputate dolor ut, condimentum lorem. Etiam sagittis, diam vel hendrerit elementum, lorem augue hendrerit velit, non luctus orci diam a orci. Duis maximus, libero vulputate pellentesque mattis, metus augue dapibus dui, eget malesuada quam odio at nulla. Vivamus est libero, efficitur varius ligula at, condimentum imperdiet est. Nulla eget leo et eros imperdiet dictum eget non nulla. Sed sed tristique est. Ut congue eleifend lorem, id auctor libero mattis dapibus. In finibus luctus dolor ut tempor. Praesent pharetra, sem a gravida luctus, felis risus venenatis nulla, vitae viverra nibh ante non ligula. Etiam iaculis bibendum arcu, non egestas dui eleifend ut. Cras facilisis lectus ut nibh hendrerit dictum. Quisque gravida in turpis vel condimentum. Mauris vel mattis metus, a tincidunt magna. Maecenas vitae libero vel sem hendrerit lobortis quis id quam. Donec ac dui id libero efficitur vestibulum ac feugiat orci. Proin et dolor dapibus, congue purus id, mattis sem. Sed finibus, neque quis tincidunt sodales, arcu ligula pharetra nunc, sit amet sodales nunc velit ac mauris. Etiam consequat hendrerit orci non venenatis. Mauris hendrerit ullamcorper molestie. Ut congue odio orci, sed vehicula magna blandit ac. Praesent est diam, rhoncus vel tempor sed, sodales eu arcu. In eget tempor est, et gravida turpis. Ut mauris justo, fringilla eget eros ut, laoreet pretium sapien. Donec vel nisl sed massa fermentum luctus. Sed mattis commodo fermentum. Nam interdum felis odio, non imperdiet turpis tincidunt et.';

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
  case 'bulkArticlesCreate':
    // Create entities, relate it and then publish it
    // example: node index bulkArticlesCreate
    for (var i = 11; i < 21; i++) {
      // Create item
      const itemCreated = client.create('articles', JSON.parse('{' +
        '"hed": "' + hed + i + '",' +
        '"promoHed": "' + hed + i + '",' +
        '"dek": "' + dek + '",' +
        '"promoDek": "' + dek + '",' +
        '"body": "' + body + '",' +
        '"socialTitle": "' + hed + i + '",' +
        '"socialDescription": "' + dek + '",' +
        '"seoTitle": "' + hed + i + '",' +
        '"seoDescription": "' + dek + '",' +
        '"channel": "' + channelName + '",' +
        '"subChannel": "' + subChannelName + '",' +
        '"contentSource": "web",' +
        '"tags": ["' + tagName + '"],' +
        '"showInHomepage": true,' +
        '"showInArchive": true,' +
        '"showInRelated": true,' +
        '"lang": "' + lang + '",' +
        '"customAdvertisementZone": "' + customAdvertisementZone + '",' +
        '"revisionAuthor": "' + revisionAuthor + '"' +
        '}')
      );
      itemCreated.then((createdEntity) => {
        console.log("created item id: " + createdEntity.id);

        // Relate channel
        client.relate('articles', createdEntity.id, {
          'categories-channels': [{
            id: channelId,
            meta: { collectionName: 'categories', modelName: 'category' }
          }]
        });

        // Relate tag
        client.relate('articles', createdEntity.id, {
          'categories-tags': [{
            id: tagId,
            meta: { collectionName: 'categories', modelName: 'category' }
          }]
        });

        // Relate type
        client.relate('articles', createdEntity.id, {
          'categories-type': [{
            id: typeId,
            meta: { collectionName: 'categories', modelName: 'category' }
          }]
        });

        // Relate layout
        client.relate('articles', createdEntity.id, {
          'categories-layout': [{
            id: layoutId,
            meta: { collectionName: 'categories', modelName: 'category' }
          }]
        });

        // Relate photosTout
        client.relate('articles', createdEntity.id, {
          photosTout: [{
            id: photoId,
            meta: { collectionName: 'photos', modelName: 'photo' }
          }]
        });

        // Relate contributorsAuthor
        client.relate('articles', createdEntity.id, {
          contributorsAuthor: [{
            id: authorId,
            meta: { collectionName: 'contributors', modelName: 'contributor' }
          }]
        });

        // Publish item
        const itemPublished = client.publish('articles', createdEntity.id, {
          uri: channelSlug + createdEntity.hed.trim().toLowerCase().replace(/\s/g, '-'),
          pubDate: new Date(),
          revision: 0,
          revisionAuthor: revisionAuthor
        });
        itemPublished.then((publishedEntity) => {
          console.log("published item id: " + publishedEntity.id);
        });

      });
    }

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
