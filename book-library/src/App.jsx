import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Routes, Route } from 'react-router-dom';
import { MyLibrary } from './components/MyLibrary/MyLibrary';
import { Navigation } from './components/Navigation/Navigation';
import { Search } from './components/Search/Search';
import { MyLibraryNavigation } from './components/MyLibraryNavigation/MyLibraryNavigation';
import { useSelector } from 'react-redux';
import { Modal } from './components/Modal/Modal';
import { getSelectedBook } from './features/modalSlice';

function App() {
  // const path = useLocation();
  const selectedBook = useSelector(getSelectedBook);

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
        <Route path="*" element="not found" />
      </Routes>

      {selectedBook && <Modal book={selectedBook} />}
    </div>
  );
}

export default App;
