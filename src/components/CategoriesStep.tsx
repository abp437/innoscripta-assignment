import Select from "react-select";

interface CategoriesStepProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoriesStep: React.FC<CategoriesStepProps> = ({ categories, setCategories }) => {
  const options = [
    { value: "Latest", label: "Latest" },
    { value: "Sports", label: "Sports" },
    { value: "Tech", label: "Tech" },
    { value: "Politics", label: "Politics" },
    { value: "Arts", label: "Arts" },
  ];

  const handleChange = (selectedOptions: any) => {
    const selectedCategories = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setCategories(selectedCategories);
  };

  return (
    <div>
      {/* Select2-like multi-select using react-select */}
      <Select
        isMulti
        name="categories"
        options={options}
        closeMenuOnSelect={false}
        value={options.filter((option) => categories.includes(option.value))}
        onChange={handleChange}
        className="mb-4"
        classNamePrefix="select"
        placeholder="Select categories..."
      />
    </div>
  );
};

export default CategoriesStep;
