import "./Title.css";
const Title = (props:any) => {
    return (
        <div className={props.classes}>{props.title}</div>
    );
    };

export default Title;