"use client";
import React from "react";

const BlobColors = React.memo(({ zIndex = "z-[-10]", customOpacity }) => {
  return (
    <>
      <svg
        width="881"
        height="786"
        viewBox="0 0 881 786"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`fixed max-w-[880px] h-fit -top-[250px] -left-48 ${zIndex}`}
      >
        <g filter="url(#filter0_f_244_104)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.247 423.388C144.317 343.323 166.161 259.681 231.422 205.498C296.234 151.688 388.164 142.534 473.638 155.722C557.335 168.636 632.954 208.172 677.462 274.318C724.366 344.026 751.065 433.335 709.992 506.985C671.401 576.184 574.791 583.831 493.378 604.406C416.547 623.823 335.729 655.146 267.203 618.89C193.595 579.944 158.011 501.537 151.247 423.388Z"
            fill="#6366F1"
            fillOpacity="0.20"
            className={`dark:opacity-50 opacity-10 ${customOpacity}`}
          />
        </g>
        <defs>
          <filter
            id="filter0_f_244_104"
            x="0.0195312"
            y="0.358185"
            width="880.238"
            height="785.205"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="75"
              result="effect1_foregroundBlur_244_104"
            />
          </filter>
        </defs>
      </svg>
      <svg
        width="732"
        height="661"
        viewBox="0 0 732 661"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`fixed -top-[170px] -right-48 ${zIndex}`}
      >
        <g filter="url(#filter0_f_240_101)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M151.802 353.496C146.659 294.072 162.872 231.992 211.309 191.777C259.412 151.839 327.643 145.045 391.083 154.833C453.203 164.418 509.328 193.762 542.361 242.856C577.174 294.593 596.99 360.879 566.505 415.542C537.863 466.901 466.158 472.577 405.733 487.848C348.709 502.26 288.725 525.508 237.865 498.598C183.233 469.693 156.823 411.498 151.802 353.496Z"
            fill="#63E8F1"
            fillOpacity="0.20"
            className={`dark:opacity-50 opacity-10 ${customOpacity}`}
          />
        </g>
        <defs>
          <filter
            id="filter0_f_240_101"
            x="0.890625"
            y="0.852188"
            width="730.656"
            height="660.121"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="75"
              result="effect1_foregroundBlur_240_101"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
});
BlobColors.displayName = "BlobColors";

export default BlobColors;
