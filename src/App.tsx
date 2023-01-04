import { useState } from "react";
import { Select } from "./component/Select";
type OptionType = {
  label: string;
  value: number;
};

const options: OptionType[] = [
  {
    label: "First",
    value: 1,
  },
  {
    label: "Second",
    value: 2,
  },
  {
    label: "Third",
    value: 3,
  },
  {
    label: "Fourth",
    value: 4,
  },
];
function App() {
  const [selected, setSelected] = useState<OptionType | undefined>(options[0]);
  const [multiSelected, setMultiSelected] = useState<OptionType[]>([options[0]]);
  return (
    <div>
      <Select options={options} selected={selected} setSelected={setSelected}/>
      <Select options={options} selected={multiSelected} setSelected={setMultiSelected} multiple={true}/>
    </div>
  );
}

export default App;
