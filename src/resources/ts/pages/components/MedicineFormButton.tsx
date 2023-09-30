import React from "react";

interface MedicineFormButtonProps {
  buttonText: string;
}

export const MedicineFormButton: React.FC<MedicineFormButtonProps> = (props) => {
  const { buttonText } = props;
  return (
      <p className="btn_center"><input type="submit" className="submit regist_sub_design regist_submit_color" value={buttonText} /></p>
  );
};
