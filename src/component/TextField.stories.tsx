import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextBox from "./TextField";

const meta = {
  title: "Component/TextBox",
  component: TextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: { children: null },
  render: () => {
    function Basic() {
      const [value, setValue] = useState("");
      return (
        <TextBox value={value}>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </TextBox>
      );
    }
    return <Basic />;
  },
} satisfies Story;

export const WithLabel = {
  args: { children: null },
  render: () => {
    function WithLabel(){

      const [value, setValue] = useState("");
      return (
        <TextBox value={value}>
          <TextBox.Label>Field Label</TextBox.Label>
          <TextBox.Input
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </TextBox>
      );
    }
    return <WithLabel />;
  },
} satisfies Story;

export const WithHelperText = {
  args: { children: null },
  render: () => {
    function HelperText() {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value}>
        <TextBox.Input
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextBox.HelperText>Helper Text</TextBox.HelperText>
      </TextBox>
    );
    }
    return <HelperText />;
  },
} satisfies Story;

export const WithHelperTextVariants = {
  args: { children: null },
  render: () => {
    function WithHelperTextVariants() {

      const [value, setValue] = useState("");
      return (
        <div className="flex flex-col gap-4">
          <TextBox value={value}>
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextBox.HelperText variant="default">
              Default helper text
            </TextBox.HelperText>
          </TextBox>
          <TextBox value={value}>
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextBox.HelperText variant="success">
              Success message
            </TextBox.HelperText>
          </TextBox>
          <TextBox value={value}>
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextBox.HelperText variant="error">Error message</TextBox.HelperText>
          </TextBox>
          <TextBox value={value}>
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextBox.HelperText variant="warning">
              Warning message
            </TextBox.HelperText>
          </TextBox>
        </div>
      );
    }
    return <WithHelperTextVariants />;
  },
} satisfies Story;

export const WithLabelAndHelper = {
  args: { children: null },
  render: () => {
    function WithLabelAndHelper() {

      const [value, setValue] = useState("");
      return (
        <TextBox value={value}>
          <TextBox.Label>Field Label</TextBox.Label>
          <div className="flex">
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <TextBox.Button
              type="external"
              onClick={() => console.log("추가 버튼 클릭")}
            >
              Button
            </TextBox.Button>
          </div>
          <TextBox.HelperText>Helper Text</TextBox.HelperText>
        </TextBox>
      );
    }
    return <WithLabelAndHelper />;
  },
} satisfies Story;

export const WithInlineButton = {
  args: { children: null },
  render: () => {
    function WithInlineButton() {
    const [value, setValue] = useState("");
    return (
      <TextBox value={value} className="relative ">
        <TextBox.Label>Field Label</TextBox.Label>
       <div className="flex items-center">
          <TextBox.Input
            hasButton
            placeholder="Placeholder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-14"
          />
          <TextBox.Button
            type="inline"
            onClick={() => console.log("추가 버튼 클릭")}
            className="absolute right-6"
          >
            추가
          </TextBox.Button>
       </div>
        <TextBox.HelperText>Helper Text</TextBox.HelperText>
      </TextBox>
    );
    }
    return <WithInlineButton />;
  },
} satisfies Story;

export const WithoutLabelAndHelper = {
  args: { children: null },
  render: () => {
    function WithoutLabelAndHelper() {
      const [value, setValue] = useState("");
      return (
        <TextBox value={value}>
          <div className="flex items-center">
            <TextBox.Input
              placeholder="Placeholder"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-11"
            />
            <TextBox.Button
              type="external"
              onClick={() => console.log("추가 버튼 클릭")}
              className="h-11"
            >
              Button
            </TextBox.Button>
          </div>
        </TextBox>
      );
    }
    return <WithoutLabelAndHelper />;
  },
} satisfies Story;
