import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HeadingStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <h1 className="text-[24px] leading-[30px] font-bold">
        Heading B - 사용 예시 입니다.
      </h1>
      <h2 className="text-[24px] leading-[30px] font-semibold">
        Heading S - 사용 예시 입니다.
      </h2>
      <h3 className="text-[24px] leading-[30px] font-medium">
        Heading M - 사용 예시 입니다.
      </h3>
      <h4 className="text-[24px] leading-[30px] font-normal">
        Heading R - 사용 예시 입니다.
      </h4>
    </div>
  )
};

export const TitleStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[20px] leading-[24px] font-bold">
        Title B - 사용 예시 입니다.
      </p>
      <p className="text-[20px] leading-[24px] font-semibold">
        Title S - 사용 예시 입니다.
      </p>
      <p className="text-[20px] leading-[24px] font-medium">
        Title M - 사용 예시 입니다.
      </p>
      <p className="text-[20px] leading-[24px] font-normal">
        Title R - 사용 예시 입니다.
      </p>
    </div>
  )
};

export const SubtitleStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[18px] leading-[22px] font-bold">
        Sub-title B - 사용 예시 입니다.
      </p>
      <p className="text-[18px] leading-[22px] font-semibold">
        Sub-title S - 사용 예시 입니다.
      </p>
      <p className="text-[18px] leading-[22px] font-medium">
        Sub-title M - 사용 예시 입니다.
      </p>
      <p className="text-[18px] leading-[22px] font-normal">
        Sub-title R - 사용 예시 입니다.
      </p>
    </div>
  )
};

export const BodyStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[16px] leading-[20px] font-bold">
        Body B - 사용 예시 입니다.
      </p>
      <p className="text-[16px] leading-[20px] font-semibold">
        Body S - 사용 예시 입니다.
      </p>
      <p className="text-[16px] leading-[20px] font-medium">
        Body M - 사용 예시 입니다.
      </p>
      <p className="text-[16px] leading-[20px] font-normal">
        Body R - 사용 예시 입니다.
      </p>
    </div>
  )
};

export const BodySmallStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[14px] leading-[18px] font-bold">
        Body Small B - 사용 예시 입니다.
      </p>
      <p className="text-[14px] leading-[18px] font-semibold">
        Body Small S - 사용 예시 입니다.
      </p>
      <p className="text-[14px] leading-[18px] font-medium">
        Body Small M - 사용 예시 입니다.
      </p>
      <p className="text-[14px] leading-[18px] font-normal">
        Body Small R - 사용 예시 입니다.
      </p>
    </div>
  )
};

export const CaptionStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[12px] leading-[16px] font-bold">
        Caption B - 사용 예시 입니다.
      </p>
      <p className="text-[12px] leading-[16px] font-semibold">
        Caption S - 사용 예시 입니다.
      </p>
      <p className="text-[12px] leading-[16px] font-medium">
        Caption M - 사용 예시 입니다.
      </p>
      <p className="text-[12px] leading-[16px] font-normal">
        Caption R - 사용 예시 입니다.
      </p>
    </div>
  )
};

export const LabelStyles: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <p className="text-[10px] leading-[12px] font-bold">
        Label B - 사용 예시 입니다.
      </p>
      <p className="text-[10px] leading-[12px] font-semibold">
        Label S - 사용 예시 입니다.
      </p>
      <p className="text-[10px] leading-[12px] font-medium">
        Label M - 사용 예시 입니다.
      </p>
      <p className="text-[10px] leading-[12px] font-normal">
        Label R - 사용 예시 입니다.
      </p>
    </div>
  )
};
