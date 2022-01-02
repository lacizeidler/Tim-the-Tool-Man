import { useEffect, useState } from "react/cjs/react.development";
import { GetRequestsTopicsUsers } from "../ApiManager";

export const RequestFilter = () => {
  const [requests, setRequests] = useState([]);
  const [course, setCourse] = useState({
      statusId: 0
  });

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
    return result.statusId === course.statusId;
  });

  return (
    <div>
      <form>
        <br />
        <br />
        <label>
          Filter by Status:
          <select value={course.statusId} onChange={handleChangeCourse}>
            {uniqueRequests.map(request => (
              <option key={request.id} value={request.status.id}>
                {request.status.status}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
        <div>
          {filterDropdown.map(request => (
            <div key={request.id} style={{ margin: "10px" }}>
              {request.description}
              <br />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}