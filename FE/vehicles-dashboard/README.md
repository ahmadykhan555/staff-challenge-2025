# Architectural decisions

### SSL Compliance

The application is made production ready by already developing it in https

### Environment configuration

All app secrets, configurations etc are made configurable via environments

### Prettier

Prettier has been configured to make sure clean code and started formatting practices are followed.

### Husky

To ensure coding standards are maintained, husky is configured to run typecheck and linting on `pre-commit` and upon `pre-push` addition tests will be run

### Styling

Tailwind is chosen as the styling library because of its granular approach which makes development faster. The application can be adapted to any branding using the tailwind config file to extend theme. To demonstrate this I have added a custom color `free-now-red` and custom font size `2xs`

### Code Organization

The codebase has been organized into logical directories for clear structure. The aim here is to isolate the business logic layer from the UI layer to ensure maximum flexibility. We will make use of `components` & `pages` for UI. Components are further divided into Base and Feature components with Base components being dumb components.

`services`, `constants`, `store` will be used to manage the business logic. Additional helper methods will be placed inside `utils`

### Routing

The decision was between file based routing with Next.Js or routing with React Router. Since SEO is not particularly important for fleet management dashboards, I chose React router. However, to ensure flexibility in the future, if the need arises of using s SSR based react application I have organized the main views of the application into pages directory. This serves the `logical` separation and also makes the application future-proof to minimize the migration effort if Next.Js is selected at a later stage.

### State Management

The decision here was between React-Redux (with toolkit) vs Zustand. Though Zustand is a great light-weight option for this coding challenge, redux is a much better choice for enterprise solutions with complex states and big teams. To keep this application future-proof I chose react-redux with toolkit for `Stability` and `Structure` which is essential for an enterprise application.

### Map Choice

Leaflet is used for Map, the reason for this was cost effectiveness. Since the dashboard doesn't need a lot of fancy features, using a map like Google Maps would be expensive for the business. Leaflet supports features like markers, zoom controls, auto panning, bounds setting, route highlighting etc which are common for such dashboards. There is a react-leaflet npm packages that I have opted for. Its very well maintained, lightweight and provides good developer experience.

### Component Markup

I have opted for a mix of components created from scratch and components coming from Wave to keep the application flexible for either option. Since Wave supports tree-shaking this wouldn't hurt the build size
