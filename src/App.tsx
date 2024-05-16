import "./App.css";
import DatePickerWrapper from "./containers/DatePickerWrapper";

function App() {
  return (
    <>
      <DatePickerWrapper
        onChange={(data) => {
          console.log(data);
        }}
      />
    </>
  );
}

export default App;
