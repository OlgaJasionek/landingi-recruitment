import { Fragment, SyntheticEvent, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "@mui/material";

import { SelectOption } from "../../../common/types/select-options";

type Props = {
  getOptionsFn: (q: string) => Promise<SelectOption[]>;
  onSelectValue: (value: SelectOption) => void;
};

const AsyncSearchBar = ({ getOptionsFn, onSelectValue }: Props) => {
  const [selectedValue, setSelectedValue] = useState<SelectOption | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);

  const fetchOptions = useMemo(
    () =>
      debounce((value: string, cb: (data: SelectOption[]) => void) => {
        if (getOptionsFn) {
          getOptionsFn(value).then(data => {
            cb(data);
          });
        }
      }, 1000),
    [getOptionsFn]
  );

  useEffect(() => {
    if (inputValue === "" || inputValue === selectedValue?.label) {
      setOptions(selectedValue ? [selectedValue] : []);
      return undefined;
    }

    setLoadingOptions(true);

    fetchOptions(inputValue, assets => {
      let newOptions: SelectOption[] = [];

      if (selectedValue) {
        newOptions = [selectedValue];
      }

      if (assets) {
        newOptions = [...newOptions, ...assets];
      }

      if (inputValue && !selectedValue) {
        const option = newOptions.find(o => o.value === parseInt(inputValue));

        if (option) {
          setSelectedValue(option);
        }
      }

      setOptions(newOptions);
      setLoadingOptions(false);
    });
  }, [selectedValue, inputValue, fetchOptions]);

  return (
    <Autocomplete
      filterOptions={x => x}
      filterSelectedOptions
      value={selectedValue}
      noOptionsText='Nie znaleziono produktów'
      loadingText='Szukanie..'
      getOptionLabel={option => option.label}
      options={options}
      loading={loadingOptions}
      onChange={(_: SyntheticEvent, newValue: SelectOption | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setSelectedValue(newValue);
        if (newValue) {
          onSelectValue(newValue);
          setInputValue("");
          setOptions([]);

          setTimeout(() => {
            setSelectedValue(null);
          }, 0);
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label='Szukaj'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loadingOptions ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncSearchBar;
