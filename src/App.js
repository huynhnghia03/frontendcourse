
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes, authRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import { Fragment, useEffect } from "react";
import Modal from './layouts/components/Modal';
import Comment from './layouts/components/proper/Comment'
import { BarMenu } from "./layouts/components/proper";
import Loading from "./layouts/components/Loading";
import ConfigRoutes from './config/routes'
import { PageNoteFound } from "./pages";

function App() {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      const data = { Username: null, email: null, admin: null, avatar: null }
      localStorage.setItem('currentUser', JSON.stringify(data));
    }
  }, [])
  return (
    <Router basename='/'>
      <div className="App">
        <Routes>
          <>
            {
              publicRoutes.map((route, index) => {
                const Page = route.component
                let Layout = DefaultLayout
                if (route.layout) {
                  Layout = route.layout
                } else if (route.layout === null) {
                  Layout = Fragment
                }
                return <Route key={index} path={route.path} element={
                  <Layout><Page /></Layout>}
                />
              })}
            {privateRoutes.map((route, index) => {
              let Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              return <Route key={index} path={route.path} element={localStorage.getItem('token') ?
                <Layout><Page /></Layout> : <Navigate to={ConfigRoutes.Login} />

              } />
            })}

            {authRoutes.map((route, index) => {
              let Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              return <Route key={index} path={route.path} element={localStorage.getItem('token') ?
                <Navigate to={ConfigRoutes.root} /> : <Layout><Page /></Layout>

              } />
            })}

            <Route path="/not-found" element={<PageNoteFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </>
        </Routes>
      </div>
      <Modal />
      <Comment />
      <BarMenu />
      <Loading />
    </Router>

  );
}

export default App;
