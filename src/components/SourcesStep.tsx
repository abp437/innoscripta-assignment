import Select from "react-select";
import { NYT, GUARDIAN, NEWS_ORG } from "../utils/constants";

interface SourcesStepProps {
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

const SourcesStep: React.FC<SourcesStepProps> = ({ sources, setSources, onSubmit }) => {
  const options = [
    { value: NYT, label: NYT },
    { value: GUARDIAN, label: GUARDIAN },
    { value: NEWS_ORG, label: NEWS_ORG },
  ];

  const handleChange = (selectedOptions: any) => {
    const selectedSources = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSources(selectedSources);
  };

  return (
    <div>
      <Select
        isMulti
        name="sources"
        options={options}
        value={options.filter((option) => sources.includes(option.value))}
        onChange={handleChange}
        closeMenuOnSelect={false}
        className="mb-4"
        classNamePrefix="select"
        placeholder="Select sources..."
      />

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-red-600 text-white p-2 hover:bg-red-500 transition duration-200 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SourcesStep;
