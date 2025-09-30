import { ErrorBanner } from './components/ErrorBanner';
import { IngredientPanel } from './components/IngredientPanel';
import { TacoDesigner } from './components/TacoDesigner';
import { OrderBoard } from './components/OrderBoard';

export const App = () => (
  <div className="app">
    <header>
      <h1>Taco Cloud Reactive Console</h1>
      <p>Interact with the Taco API via reactive streams on the front-end.</p>
    </header>
    <ErrorBanner />
    <main>
      <div className="grid-layout">
        <IngredientPanel />
        <TacoDesigner />
        <OrderBoard />
      </div>
    </main>
  </div>
);
