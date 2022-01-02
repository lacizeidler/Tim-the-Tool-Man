import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react/cjs/react.development";
import { GetRequestsTopicsUsers } from "../ApiManager";
import { RequestList } from "./RequestList";
import "./RequestForm.css"

export const RequestFilter = () => {
  const [requests, setRequests] = useState([]);
  const [course, setCourse] = useState(0);
  const history = useHistory()

  const handleChangeCourse = event => {
    setCourse(parseInt(event.target.value));
  };

  const getUnique = (arr, comp) => {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  };

  useEffect(() => {
    GetRequestsTopicsUsers()
    .then(setRequests)
  }, []);

  const uniqueRequests = getUnique(requests, "statusId");

  const filterDropdown = requests.filter(function(result) {
    return result.statusId === course;
  });

  return (
    <div>
      <form>
        <br />
        <br />
        <label className="status__label">
          Filter by Status:
          <select value={course.statusId} onChange={handleChangeCourse}>
            <option value={0}>Select a Status...</option>
            {uniqueRequests.map(request => (
              <option key={request.id} value={request.status.id}>
                {request.status.status}
              </option>
            ))}
          </select>
        </label>
        {
          course === 0 
          ? <RequestList />
          : <div>
          {filterDropdown.map(request => (
            <div key={request.id} style={{ margin: "10px" }}>
              <div className="status__request" key={`request-${request.id}`}>
                            <Link className="request__list" key={`/requests/${request.user.id}`} to={`/requests/${request.user.id}`}>Customer: {request.user.name}</Link>
                                <h4>Topic: {request.topic.name}</h4>
                                <h4>Description: {request.description}</h4>
                                <h4>Budget: ${request.budget}</h4>
                                <h4>Status: {request.status.status}</h4>
                                <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(request.timestamp)}</h4>
                                <button
                                    key={`/requests/editstatus/${request.id}`}
                                    onClick={
                                        () => {
                                            history.push(`/requests/editstatus/${request.id}`)
                                        }
                                    }
                                    value={request.id}
                                >
                                    Update Status
                                </button>
                        </div>
              <br />
            </div>
          ))}
        </div>
        }
        
      </form>
    </div>
  );
}