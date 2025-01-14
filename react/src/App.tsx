import {FC} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PageRenderer from '@pages/PageRenderer';
import PageModel from '@models/PageModel';
import {pages} from '@pages/pages';

import './App.css';

interface AppProps {
  page?: PageModel;
}

const App: FC<AppProps> = ({page}) => {
  if (page) {
    return <PageRenderer page={page} />;
  }

  return (
    <Router>
      <Routes>
        {pages.map((page) => (
          <Route key={page.id} path={page.path} element={<page.component />} />
        ))}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
