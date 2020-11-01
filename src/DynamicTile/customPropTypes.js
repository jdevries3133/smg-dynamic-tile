/*
 * Custom propType validation functions for the DynamicTile component.
 */

export function validateWidthHeight(props, propName, componentName) {
  /*
   * Ensure that totalWidthPixels and totalHeightPixels props are mutually
   * exclusive, and ensure that whichever one has been supplied is a number.
   */
  // they shouldn't both be defined
  if (props.totalWidthPixels && props.totalHeightPixels) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Width and height ` +
        "props are mutually exclusive to maintain a fixed aspect ratio."
    );
  }
  // one of them should be a number
  if (
    typeof props.totalWidthPixels !== "number" &&
    typeof props.totalHeightPixels !== "number"
  ) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Expected number`
    );
  }
}
