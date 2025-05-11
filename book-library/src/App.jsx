import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Aside } from './components/Aside/Aside';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MyLibrary } from './components/MyLibrary/MyLibrary';
import { Navigation } from './components/Navigation/Navigation';
import { Search } from './components/Search/Search';
import { MyLibraryNavigation } from './components/MyLibraryNavigation/MyLibraryNavigation';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  const path = useLocation();

  return (
    <Provider store={store}>
      <div className="wrap">
        <header>
          <Navigation />
        </header>
        <main className={path.pathname === '/catalog' ? 'mainCatalog' : 'main'}>
          {path.pathname === '/catalog' ? (
            <Search />
          ) : (
            <Aside>
              <MyLibraryNavigation />
            </Aside>
          )}

          {/* {path.pathname === '/catalog' ? (
            <Aside>
              <Search />
            </Aside>
          ) : (
            <Aside>
              <MyLibraryNavigation />
            </Aside>
          )} */}

          <Routes>
            <Route path="/" element={<MyLibrary />}></Route>
            <Route path="catalog" element={<Catalog />} />
            <Route path="*" element="not found" />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
