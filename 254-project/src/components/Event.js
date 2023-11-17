function Event({startTime, endTime, name}){

    return (
        <li className="event-component">
            <div className="event-div">
                <p className="event-text">({startTime} - {endTime}) {name}</p>
            </div>
        </li>
    );
}

export default Event;