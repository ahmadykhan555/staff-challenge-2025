## Architectural decisions

### Code Organization

The codebase has been organized into logical directories for clear structure. The aim here is to isolate the business logic layer from the UI layer to ensure maximum flexibility. I have made use of `layouts`, `pages`, `components` for UI. Components are further divided into Base and Feature components. To manage the business logic `services`, `constants`, `store`, `hooks` are used, additional helper methods can be placed inside `utils`. I have also created a `types` directory to keep all types in a consolidated place.

### Styling

Tailwind is chosen as the styling library because of its granular approach which makes development faster. The application can be adapted to any branding using the tailwind config file to extend theme. To demonstrate this I have added a custom color `free-now-red` and custom font size `2xs`

### Routing

The decision was between file based routing with Next.Js or routing with React Router. Since SEO is not particularly important for fleet management dashboards, I chose React router. However, to ensure flexibility in the future, if the need arises of using s SSR based react application I have organized the main views of the application into pages directory. This serves the `logical` separation and also makes the application future-proof to minimize the migration effort if Next.Js is selected at a later stage.

### State Management

The decision here was between React-Redux (with toolkit) vs Zustand. Though Zustand is a great light-weight option for this coding challenge, redux is a much better choice for enterprise solutions with complex states and big teams. To keep this application future-proof I chose react-redux with toolkit for `Stability` and `Structure` which is essential for an enterprise application.

### Map Choice

Leaflet is used for Map, the reason for this was cost effectiveness. Since the dashboard doesn't need a lot of fancy features, using a map like Google Maps would be expensive for the business. Leaflet supports features like markers, zoom controls, auto panning, bounds setting, route highlighting etc which are common for such dashboards. There is a react-leaflet npm packages that I have opted for. Its very well maintained, lightweight and provides good developer experience.

### Component Markup

I have opted for a mix of components created from scratch and components coming from Wave to keep the application flexible for either option. Since Wave supports tree-shaking this wouldn't hurt the build size and creating components from scratch will be speedy because of use of tailwind.

### Responsiveness

This application is usable on all screen-sizes, the responsiveness has been achieved by simple style manipulations because the components' UI was mostly the same across all screen sizes. If the UI is expected to be different then I like to create separate components where things are becoming too complex with the <MobileComponentName /> prefix.

### Bundling and Scaffolding

I have opted for using Vite for this application. Vite has a big community and some benefits when compared to webpack like faster local development and faster bundling using `rollup`. Vite is also being widely adopted as an industry standard which keeps this application at par with most modern applications.

### Package manager

I have opted for using `yarn` as a personal preference, I like its caching features and fast installation speeds. I dont really have a strong opinion here, I am happy with `npm` as well but I usually use `yarn` as it feels more modern to me

## General

### SSL Compliance

The application is made production ready by already developing it in https

### Environment configuration for securely handling sensitive data

All app secrets, configurations etc are made configurable via environments, there is a .env file I have created for this purpose.

## Tooling

### Prettier

Prettier has been configured to make sure clean code and started formatting practices are followed.

### Husky

To ensure coding standards are maintained, husky is configured to run typecheck and linting on `pre-commit` and upon `pre-push` tests are configured to be run

## Testing

To keep the setup easy and flexible I have chosen Vite with react testing library and jest. My aim is to follow a pyramid approach for testing which comprises of Unit test at the base, integration tests and E2E tests. For the purpose of this project I have used jest for integration and unit tests for some of the components. The testing approach can be extended as the application grows.

## Running the application

1. Ensure the server is running by going into the server directory `Server/` and running `npm install && npm run start`
2. To run the frontend, go to the application directory, `cd FE/vehicles-dashboard` and run `nvm use` to select the correct node version. I have used `v20.17.0` for this application
3. Once correct node version is selected run `yarn install` to install all the dependencies
4. When the installation is finished you can run `yarn dev` to run the application locally. You run the application in both http and https mode. This can be controlled through the .env file (added to the project for testing)

## Future considerations

1. **Testing** I would have liked to invest more time in writing more detailed Integration tests. Since the application is fairly small at the moment, my solution provides a framework around which the Integration tests can be expanded
2. **Lazy loading** In the future if the table needs to grow to accommodate more than 10 items at a time, I would like to use Lazy loaded components.
3. **Pagination** In my opinion the pagination should be handled on the sever, for the purpose of this project this was handled client side but that is not ideal. I would want to keep the client as lean as possible and leverage the `server`'s resources for a faster experience.
4. **Performance monitoring** As the application grows I would like to integrate `Sentry` to keep an eye on runtime errors. I would also want to pair the performance monitoring with AWS Cloudwatch and datadog to keep an eye on memory leaks, upscaling of the application etc.
5. **SSR** Depending on the use-case if SEO becomes relevant at some point SSR would be an excellent choice. I have tried to keep the application structured in a way that it should be mostly migratable to Next.js, especially the way I organized the different pages.
6. **Authentication** As this application serves as a fleet management dashboard I would want to have a Basic Auth layer to prevent unauthorized usage. I would also expand this further with user roles and user authentication via login to ensure only authorized people have access to the vehicle's data.
