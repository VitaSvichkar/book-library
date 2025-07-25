import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Routes, Route } from 'react-router-dom';
import { MyLibrary } from './components/MyLibrary/MyLibrary';
import { Navigation } from './components/Navigation/Navigation';
import { MyLibraryNavigation } from './components/MyLibraryNavigation/MyLibraryNavigation';
import { ModalWrapper } from './components/Modal/ModalWrapper';
import { FC } from 'react';

const App: FC = () => {
  return (
    <div className="wrap">
      <header>
        <Navigation />
      </header>
      <Routes>
        <Route
          path="/"
          element={<MyLibrary myLibraryNavigation={<MyLibraryNavigation />} />}
        ></Route>
        <Route path="catalog" element={<Catalog />} />
        <Route path="*" element={<Catalog />} />
      </Routes>
      <ModalWrapper />
    </div>
  );
};

export default App;
