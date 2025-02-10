const Header = ({ name }) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    );
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((note) => (
                <Part
                    key={note.id}
                    part={note.name}
                    exercises={note.exercises}
                />
            ))}
        </div>
    );
};

const Total = ({ parts }) => {
    return (
        <>
            <p>
                total of {parts.reduce((acc, elem) => acc + elem.exercises, 0)}{' '}
                exercises
            </p>
        </>
    );
};

const Course = (props) => {
    return (
        <div>
            <Header name={props.course.name}></Header>
            <Content parts={props.course.parts}></Content>
            <Total parts={props.course.parts}></Total>
        </div>
    );
};

export default Course;
