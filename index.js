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
const channelSlug = 'contentreferences/';
const channelName = 'Trends';
const subChannelName = 'Events';
const tagId = '5d03a66f19d132b6e12f0c22';
const tagName = 'Tag1';
const typeId = '5d03a59619d1327e282f0c1f';
const layoutId = '5d03a75619d13249962f0c26';
const photoId = '5d4162c65cca710009d59686';
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
  case 'sync_to_rms':
    // Sync collections entity to RMS
    // example: node index sync_to_rms categories table_name 'parent-category-slug'

    /*
    cURL example
    export PARENT_ID=XXXXX
    export NEW_ID=$(curl -sd '{"meta": {"collectionName": "categories", "modelName": "category"}, "name": "XXXXX", "slug": "XXXXX"}' -H "Content-Type: application/json" -X POST "http://lacucinaitaliana-service.local:8080/categories" | jq -r .id)
    curl -sd "[{\"id\": \"${PARENT_ID}\", \"meta\": {\"collectionName\": \"categories\", \"modelName\": \"category\"}}]" -H "Content-Type: application/json" -X PUT "http://lacucinaitaliana-service.local:8080/categories/${NEW_ID}/rels/parent"
    */

    /*
    List of items list replaces:
    - " => '
    - '' => "
    - ,' => ',
    - delete last comma (,)
    */

    // Items list
    const items = [
      '013f7dcb-0f6a-37c6-9701-ed47ffa01dd4|{"title":"Gnocchi","slug":"gnocchi","letter":"G"}',
      '016497a0-15a7-37cf-9ce2-28e786805da6|{"title":"Baking soda","slug":"baking-soda","letter":"B"}',
      'ff8ec670-0183-350c-87e2-afea2a35d353|{"title":"Shellfish","slug":"shellfish","letter":"S"}'
    ];

    // Loop over items
    for (let item of items) {
      const item_array = item.split('|');
      const tax_id = item_array[0];
      // console.log(item_array[0] + ' - ' + JSON.parse(item_array[1]).title + ' - ' + JSON.parse(item_array[1]).slug);

      // Create new item
      const createNewCategoryResult = client.create(collection, JSON.parse('{"name": "' + JSON.parse(item_array[1]).title + '", "slug": "' + JSON.parse(item_array[1]).slug + '"}'));
      createNewCategoryResult.then((createNewCategoryEntity) => {
        // console.log("new item id: " + createNewCategoryEntity.id);

        // Show update statement
        console.log("UPDATE " + payload + " SET old_id = id, id = '" + createNewCategoryEntity.id + "' WHERE id = '" + tax_id + "';");

        // Relate new item to the parent
        const parentCategory = client.getCategory(value);
        parentCategory.then((parentCategoryEntity) => {
          // console.log("parent item id: " + parentCategoryEntity.id);

          client.relate(collection, createNewCategoryEntity.id, {
            parent: [ parentCategoryEntity ]
          });
        });
      });
    }
    break;
  case 'taxonomies_first_creation':
    // Provide first creation for shared taxonomies
    // example: node index taxonomies_first_creation

    /*
    Query for extracting data
    select concat('diet', '|', attribute_data, ',') from cn_rms_diets rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('level', '|', attribute_data, ',') from cn_rms_levels rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('meal', '|', attribute_data, ',') from cn_rms_meals rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('occasion', '|', attribute_data, ',') from cn_rms_occasions rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('region', '|', attribute_data, ',') from cn_rms_regions rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('season', '|', attribute_data, ',') from cn_rms_seasons rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('dishes', '|', attribute_data, ',') from cn_rms_dishes rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('tags', '|', attribute_data, ',') from cn_rms_topics rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US'
    union
    select concat('ingredient', '|', attribute_data, ',') from cn_rms_ingredients rms, rainlab_translate_attributes t where rms.id = t.model_id and t.locale = 'en-US';

    List of items list replaces:
    - " => '
    - '' => "
    - ,' => ',
    - delete last comma (,)
    - check escaping errors
    */

    // Items list
    const rows = [
      'diet|{"title":"Low Calorie","slug":"low-calorie","order":0}',
      'diet|{"title":"Gluten Free","slug":"gluten-free","order":0}',
      'diet|{"title":"Vegan","slug":"vegan","order":0}',
      'diet|{"title":"Vegetarian","slug":"vegetarian","order":0}',
      'level|{"title":"Intermediate","slug":"intermediate","order":0}',
      'level|{"title":"Advanced","slug":"advanced","order":0}',
      'level|{"title":"Easy","slug":"easy","order":0}',
      'level|{"title":"Hard","slug":"hard","order":0}'
    ];

    // Set default collection
    const default_collection = 'categories';

    // Loop over items
    for (let row of rows) {
      const row_array = row.split('|');
      const tax_parent_slug = row_array[0];

      // Create new item
      const createNewCategoryResult = client.create(default_collection, JSON.parse(
        '{"name": "' + JSON.parse(row_array[1]).title + '", "slug": "' + JSON.parse(row_array[1]).slug + '"}'
      ));
      createNewCategoryResult.then((createNewCategoryEntity) => {
        console.log(tax_parent_slug + " new item id: " + createNewCategoryEntity.id);

        // Relate new item to the parent
        const parentCategory = client.getCategory(tax_parent_slug);
        parentCategory.then((parentCategoryEntity) => {
          client.relate(default_collection, createNewCategoryEntity.id, {
            parent: [ parentCategoryEntity ]
          });
        });
      });
    }
    break;
  case 'recipes_first_creation':
    // Provide first creation for recipes
    // example: node index recipes_first_creation contentreferences

    // Recipes list
    const recipes = [
      "209279|Fettuccine all'abruzzese",
      "209326|Risotto all'astice"
    ];

    for (let recipe of recipes) {
      const recipe_array = recipe.split('|');

      // Create new item
      const created_recipe = client.create(collection, JSON.parse(
        '{"hed": "' + recipe_array[1] + '", "identifier": "' + recipe_array[0] + '", "provider": "rms-recipe", "lang": ["en-US", "en-GB", "it-IT"]}'
      ));
      created_recipe.then((createdRecipeEntity) => {
        console.log("created recipe id: " + createdRecipeEntity.id);

        // Relate photosTout
        client.relate(collection, createdRecipeEntity.id, {
          photosTout: [{
            id: photoId,
            meta: { collectionName: 'photos', modelName: 'photo' }
          }]
        });

        // Publish item
        const published_recipe = client.publish(collection, createdRecipeEntity.id, {
          uri: channelSlug + createdRecipeEntity.id,
          pubDate: new Date(),
          revision: 0,
          revisionAuthor: revisionAuthor
        });
        published_recipe.then((publishedRecipeEntity) => {
          console.log("published recipe id: " + publishedRecipeEntity.id);
        });
      });
    }
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
