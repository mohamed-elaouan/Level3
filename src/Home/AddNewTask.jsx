

import ReactLoading from "react-loading";
import ModalFrgPss from "../Shared/Model.jsx";
const AddNewTask = ({Addbtn,Detailtxt,Tiltetxt,SubBtn,setFrgPsw,Title,taskText,TaskArray,LodingAnimate,ClearModel}) => {
  return (
      <div>
        <ModalFrgPss close={setFrgPsw} ClearModel={ClearModel} >
                <form className="addTask">
                  <h3 style={{ textAlign: "center" }}>Add New Task</h3>
                  <input
                    required
                    onChange={(eo) => {
                      Tiltetxt(eo);
                    }}
                    className="txt"
                    type="text"
                    value={Title}
                    style={{ width: "350px" }}
                    placeholder="Taper Title"
                  />
                  <div className="col ">
                    <input
                      className="txt"
                      type="text"
                      id="tasktxt"
                      onChange={(eo) => {
                        Detailtxt(eo);
                      }}
                      style={{ width: "300px" }}
                      placeholder="Details ..."
                      value={taskText}
                    />{" "}
                    <button
                      onClick={(eo) => {
                        Addbtn(eo);
                      }}
                      className="btn btn-success"
                    >
                      Add
                    </button>
                  </div>
                  <ul style={{ textAlign: "start" }}>
                    {TaskArray.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  {/*Submit Add Data to Datbase : */}
                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginBottom: "22px",
                    }}
                    onClick={(eo) => {
                      SubBtn(eo);
                    }}
                    className="btn btn-success"
                  >
                    {LodingAnimate === true ? (
                      <ReactLoading type="spokes" color="gold" height={25} width={25} />
                    ) : (
                      "Create New Task"
                    )}
                  </button>
                </form>
              </ModalFrgPss>
      </div>
  );
};

export default AddNewTask;
