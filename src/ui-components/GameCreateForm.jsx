/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createGame } from "../graphql/mutations";
const client = generateClient();
export default function GameCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Team1Name: "",
    Team1Score: "",
    Team2Name: "",
    Team2Score: "",
    live: false,
  };
  const [Team1Name, setTeam1Name] = React.useState(initialValues.Team1Name);
  const [Team1Score, setTeam1Score] = React.useState(initialValues.Team1Score);
  const [Team2Name, setTeam2Name] = React.useState(initialValues.Team2Name);
  const [Team2Score, setTeam2Score] = React.useState(initialValues.Team2Score);
  const [live, setLive] = React.useState(initialValues.live);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTeam1Name(initialValues.Team1Name);
    setTeam1Score(initialValues.Team1Score);
    setTeam2Name(initialValues.Team2Name);
    setTeam2Score(initialValues.Team2Score);
    setLive(initialValues.live);
    setErrors({});
  };
  const validations = {
    Team1Name: [],
    Team1Score: [],
    Team2Name: [],
    Team2Score: [],
    live: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Team1Name,
          Team1Score,
          Team2Name,
          Team2Score,
          live,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createGame.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameCreateForm")}
      {...rest}
    >
      <TextField
        label="Team1 name"
        isRequired={false}
        isReadOnly={false}
        value={Team1Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Team1Name: value,
              Team1Score,
              Team2Name,
              Team2Score,
              live,
            };
            const result = onChange(modelFields);
            value = result?.Team1Name ?? value;
          }
          if (errors.Team1Name?.hasError) {
            runValidationTasks("Team1Name", value);
          }
          setTeam1Name(value);
        }}
        onBlur={() => runValidationTasks("Team1Name", Team1Name)}
        errorMessage={errors.Team1Name?.errorMessage}
        hasError={errors.Team1Name?.hasError}
        {...getOverrideProps(overrides, "Team1Name")}
      ></TextField>
      <TextField
        label="Team1 score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Team1Score}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Team1Name,
              Team1Score: value,
              Team2Name,
              Team2Score,
              live,
            };
            const result = onChange(modelFields);
            value = result?.Team1Score ?? value;
          }
          if (errors.Team1Score?.hasError) {
            runValidationTasks("Team1Score", value);
          }
          setTeam1Score(value);
        }}
        onBlur={() => runValidationTasks("Team1Score", Team1Score)}
        errorMessage={errors.Team1Score?.errorMessage}
        hasError={errors.Team1Score?.hasError}
        {...getOverrideProps(overrides, "Team1Score")}
      ></TextField>
      <TextField
        label="Team2 name"
        isRequired={false}
        isReadOnly={false}
        value={Team2Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Team1Name,
              Team1Score,
              Team2Name: value,
              Team2Score,
              live,
            };
            const result = onChange(modelFields);
            value = result?.Team2Name ?? value;
          }
          if (errors.Team2Name?.hasError) {
            runValidationTasks("Team2Name", value);
          }
          setTeam2Name(value);
        }}
        onBlur={() => runValidationTasks("Team2Name", Team2Name)}
        errorMessage={errors.Team2Name?.errorMessage}
        hasError={errors.Team2Name?.hasError}
        {...getOverrideProps(overrides, "Team2Name")}
      ></TextField>
      <TextField
        label="Team2 score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={Team2Score}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              Team1Name,
              Team1Score,
              Team2Name,
              Team2Score: value,
              live,
            };
            const result = onChange(modelFields);
            value = result?.Team2Score ?? value;
          }
          if (errors.Team2Score?.hasError) {
            runValidationTasks("Team2Score", value);
          }
          setTeam2Score(value);
        }}
        onBlur={() => runValidationTasks("Team2Score", Team2Score)}
        errorMessage={errors.Team2Score?.errorMessage}
        hasError={errors.Team2Score?.hasError}
        {...getOverrideProps(overrides, "Team2Score")}
      ></TextField>
      <SwitchField
        label="Live"
        defaultChecked={false}
        isDisabled={false}
        isChecked={live}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Team1Name,
              Team1Score,
              Team2Name,
              Team2Score,
              live: value,
            };
            const result = onChange(modelFields);
            value = result?.live ?? value;
          }
          if (errors.live?.hasError) {
            runValidationTasks("live", value);
          }
          setLive(value);
        }}
        onBlur={() => runValidationTasks("live", live)}
        errorMessage={errors.live?.errorMessage}
        hasError={errors.live?.hasError}
        {...getOverrideProps(overrides, "live")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
