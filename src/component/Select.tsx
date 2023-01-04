import React, { useEffect, useState, useRef } from "react";
import "./SingleSelect.css";
type OptionType = {
  label: string;
  value: number;
};
type SingleSelect = {
  selected: OptionType | undefined;
  multiple?: false;
  setSelected: (selected: OptionType | undefined) => void;
};
type MultiSelect = {
  multiple: true;
  selected: OptionType[];
  setSelected: (selected: OptionType[] | []) => void;
};
type SelectType = {
  options: OptionType[];
} & (SingleSelect | MultiSelect);

export const Select = ({
  options,
  selected,
  setSelected,
  multiple,
}: SelectType) => {
  const [overOption, setOverOption] = useState(options[0].value);
  const [show, setShow] = useState(false);
  const [newSelect, setNewSelect] = useState("");
  useEffect(() => {
    if (!show) {
      setOverOption(1);
    }
  }, [show]);
  const selectOption = (option: OptionType) => {
    if (multiple) {
      const isFind = selected.find((item) => item.value == option.value);
      if (!isFind) {
        setSelected([...selected, option]);
      } else {
        setSelected(selected.filter((item) => item.value != option.value));
      }
    } else {
      setSelected(option);
    }

    setShow(!show);
  };
  const claerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (multiple) {
      setSelected([]);
    } else {
      setSelected(undefined);
    }
  };
  const deleteMultiSelectItem = (
    select: OptionType,
    e: React.MouseEvent<HTMLSpanElement | MouseEvent>
  ) => {
    e.stopPropagation();
    if (multiple) {
      setSelected(selected.filter((item) => item.value != select.value));
    }
  };
  const createSelect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newVal = options[options.length - 1].value + 1;
    options.push({ value: newVal, label: newSelect });
    console.log(options[options.length - 1].value);
    setNewSelect("");
  };
  return (
    <div
      className="container"
      tabIndex={1}
      // onBlur={() => setShow(false)}
      onClick={() => {
        setShow(!show);
      }}
    >
      <div className="select-container">
        {multiple
          ? selected.map((select) => (
              <span className="multi" key={select.value}>
                <span
                  className="badge"
                  onClick={(e) => deleteMultiSelectItem(select, e)}
                >
                  x
                </span>{" "}
                {select.label}
              </span>
            ))
          : selected?.label}
      </div>
      <div className="btn-container">
        <button onClick={(e) => claerHandler(e)}>x</button>
        <span className="stick"></span>
        <span
          className={`dropdown ${!show ? "down" : "up"}`}
          onClick={() => {
            setShow(!show);
          }}
        ></span>
      </div>
      <ul className={show ? "show" : ""}>
        {multiple && (
          <li>
            <form onSubmit={(e) => createSelect(e)}>
              <input
                type={"text"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                value={newSelect}
                onChange={(e) => {
                  setNewSelect(e.target.value);
                }}
                placeholder="Add..."
              />
              <button type="submit">ADD</button>
            </form>
            4
          </li>
        )}
        {options.map((option) => {
          return (
            <li
              key={option.value}
              onClick={() => selectOption(option)}
              className={`${
                !multiple
                  ? option.value == selected?.value
                    ? "selected"
                    : ""
                  : option.value ==
                    selected.filter((opt) => opt.value == option.value)[0]
                      ?.value
                  ? "selected"
                  : ""
              } ${option.value == overOption ? "over" : ""}`}
              onMouseEnter={() => setOverOption(option.value)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
