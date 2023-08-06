import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, limit, where } from "firebase/firestore";

import ReactLoading from "react-loading";
import Moment from "react-moment";
//import 'moment-timezone';
const Tasks = ({ user, db }) => {
  //Order and etat de Completed:
  const [Completed, setCompleted] = useState(null);
  const [SelestValue, setSelestValue] = useState("All Task");

  const btnOrder = useRef(null);

  const [Disable, setDisable] = useState(true);
  const [Query, setQuery] = useState(
    query(
      collection(db, user.uid),
      orderBy("Id", "asc") &&
        // (Completed
        //   ? where("Completed", "==", true)
        //   : Completed === false
        //   ? where("Completed", "==", false)
        //   : true)
        where("Completed", "==", false)
    )
  );
  const [Opacite, setOpacite] = useState(true);
  const [value, loading, error] = useCollection(Query);
  if (error) {
    return <h2>Tu as un Errors</h2>;
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <ReactLoading type="spokes" color="violet" height={77} width={77} />
      </div>
    );
  }
  if (value) {
    return (
      <div className="GrandParent">
        <section className="OPIONS">
          {Disable && <input
            ref={btnOrder}
            type="button"
            className="btn btn-primary"
            style={{ opacity: Opacite ? 0.3 : 1 }}
            onClick={() => {
              setQuery(query(collection(db, user.uid), orderBy("Id", "desc")));
              setOpacite(false);
            }}
            value={"Newest first"}
          />}

          {Disable &&<input
            type="button"
            className="btn btn-primary"
            style={{ opacity: !Opacite ? 0.3 : 1 }}
            onClick={() => {
              setQuery(query(collection(db, user.uid), orderBy("Id", "asc")));
              setOpacite(true);
            }}
            value={"Oldest first"}
          /> }
          <select
            id="browsers" 
            value={SelestValue}
            onChange={(eo) => {
              if (eo.target.value === "Completed") {
                setQuery(
                  query(
                    collection(db, user.uid),
                    orderBy("Id", "asc") && where("Completed", "==", true)
                  )
                );
                setSelestValue(eo.target.value);
                setDisable(false);

              }
              if (eo.target.value === "Not Completed") {
                setQuery(
                  query(
                    collection(db, user.uid),
                    orderBy("Id", "asc") && where("Completed", "==", false)
                  )
                );
                setSelestValue(eo.target.value);
                setDisable(false)
              }
              if (eo.target.value === "All Tasks") {
                setOpacite(true);
                setQuery(query(collection(db, user.uid), orderBy("Id", "asc")));
                setSelestValue(eo.target.value);
                setDisable(true);
                
              }
            }}
          >
            <option value="All Tasks"> All Tasks </option>
            <option value="Completed"> Completed </option>
            <option value="Not Completed"> Not Completed </option>
          </select>
          
        </section>
        <section className="Tasks">
          {value.docs.length !== 0 ? (
            value.docs.map((item) => {
              return (
                <Link
                  to={`/TaskEdit/${item.data().Id}`}
                  className="reinitialise"
                >
                  <article dir="auto" className="OneTask">
                    <h2>{item.data().Title}</h2>
                    <ul>
                      {item.data().TasksSup.map((ele, i) => {
                        if (i < 2) {
                          return <li key={i}>{ele}</li>;
                        }
                      })}
                    </ul>
                    <p>
                      <Moment fromNow>{item.data().Id}</Moment>
                    </p>
                  </article>
                </Link>
              );
            })
          ) : (
            <h1>Felicitation Pour Terminé Tout Les Tasks</h1>
          )}
        </section>
      </div>
    );
  }
};

export default Tasks;
