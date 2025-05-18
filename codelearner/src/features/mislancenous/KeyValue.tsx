import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { TestCase } from "../../types/content/problem.type";

interface KeyValuePair {
  key: string;
  value: string;
}

interface TestCases {
  test_cases: TestCase;
}

interface KeyValueFormProps {
  initialData?: TestCases;
  onChange?: (data: TestCases) => void;
  title?: string;
}

const KeyValueForm: React.FC<KeyValueFormProps> = ({
  initialData,
  onChange,
  title,
}) => {
  const initialPairs: KeyValuePair[] = initialData?.test_cases.input.map(
    (key, index) => ({
      key,
      value: initialData.test_cases.output[index] || "",
    })
  ) || [{ key: "", value: "" }];

  const [pairs, setPairs] = useState<KeyValuePair[]>(initialPairs);

  // Sync pairs when initialData changes
  useEffect(() => {
    const newPairs = initialData?.test_cases.input.map((key, index) => ({
      key,
      value: initialData.test_cases.output[index] || "",
    })) || [{ key: "", value: "" }];
    setPairs(newPairs);
  }, [initialData]);

  const handleInputChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newPairs = [...pairs];
    newPairs[index][field] = value;
    setPairs(newPairs);
    onChange?.({
      test_cases: {
        input: newPairs.map((pair) => pair.key),
        output: newPairs.map((pair) => pair.value),
      },
    });
  };

  const addPair = () => {
    const newPairs = [...pairs, { key: "", value: "" }];
    setPairs(newPairs);
    onChange?.({
      test_cases: {
        input: newPairs.map((pair) => pair.key),
        output: newPairs.map((pair) => pair.value),
      },
    });
  };

  const removePair = (index: number) => {
    if (pairs.length > 1) {
      const newPairs = pairs.filter((_, i) => i !== index);
      setPairs(newPairs);
      onChange?.({
        test_cases: {
          input: newPairs.map((pair) => pair.key),
          output: newPairs.map((pair) => pair.value),
        },
      });
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <BootstrapForm.Label>{title}</BootstrapForm.Label>
        <Button
          variant="success"
          onClick={addPair}
          size="sm"
          className="ms-auto mb-3"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Test Case
        </Button>
      </div>
      {pairs.map((pair, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <BootstrapForm.Control
              as="textarea"
              rows={1}
              placeholder="Input (e.g., 2\n1 2)"
              value={pair.key}
              onChange={(e) => handleInputChange(index, "key", e.target.value)}
              style={{ resize: "vertical" }}
            />
          </Col>
          <Col>
            <BootstrapForm.Control
              as="textarea"
              rows={1}
              placeholder="Output (e.g., YES)"
              value={pair.value}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value)
              }
              style={{ resize: "vertical" }}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="danger"
              onClick={() => removePair(index)}
              disabled={pairs.length === 1}
            >
              <i className="bi bi-trash-fill"></i>
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default KeyValueForm;
