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
import { getGame } from "../graphql/queries";
import { updateGame } from "../graphql/mutations";
const client = generateClient();
export default function GameUpdateForm(props) {
  const {
    id: idProp,
    game: gameModelProp,
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
    const cleanValues = gameRecord
      ? { ...initialValues, ...gameRecord }
      : initialValues;
    setTeam1Name(cleanValues.Team1Name);
    setTeam1Score(cleanValues.Team1Score);
    setTeam2Name(cleanValues.Team2Name);
    setTeam2Score(cleanValues.Team2Score);
    setLive(cleanValues.live);
    setErrors({});
  };
  const [gameRecord, setGameRecord] = React.useState(gameModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getGame.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getGame
        : gameModelProp;
      setGameRecord(record);
    };
    queryData();
  }, [idProp, gameModelProp]);
  React.useEffect(resetStateValues, [gameRecord]);
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
          Team1Name: Team1Name ?? null,
          Team1Score: Team1Score ?? null,
          Team2Name: Team2Name ?? null,
          Team2Score: Team2Score ?? null,
          live: live ?? null,
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
            query: updateGame.replaceAll("__typename", ""),
            variables: {
              input: {
                id: gameRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameUpdateForm")}
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || gameModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || gameModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
