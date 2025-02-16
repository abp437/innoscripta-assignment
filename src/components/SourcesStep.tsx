import Select from "react-select";

interface SourcesStepProps {
  sources: string[];
  setSources: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

const SourcesStep: React.FC<SourcesStepProps> = ({ sources, setSources, onSubmit }) => {
  const options = [
    { value: "NY Times", label: "NY Times" },
    { value: "Guardian", label: "Guardian" },
    { value: "News", label: "News" },
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
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SourcesStep;
