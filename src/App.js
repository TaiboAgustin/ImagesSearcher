import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import './Header.css'
import './Content.css'
import './Article.css'


const App=() =>{
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: ''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID _aNGdNj0GEReC5qZuDvL8YI_MlfEtKpS5rYyNdJqDdo'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}> 
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
