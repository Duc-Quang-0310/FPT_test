import React from "react";
import { createPortal } from "react-dom";

export interface HQModal {
  isOpen: boolean;
  handleDiscard: () => void;
  handleContinueEdit: () => void;
}

export const Modal: React.FC<HQModal> = ({
  isOpen = true,
  handleDiscard,
  handleContinueEdit,
}) =>
  createPortal(
    <div id="hq-modal" data-display={isOpen}>
      <div className="modal-content">
        <div className="icon-wrap">!</div>
        <div className="content-wrap">
          <p className="title">Unsaved changes</p>
          <p className="content">
            Do you want to discard edits or continue editing ?
          </p>
          <div className="btn-block">
            <button className="btn-outline" onClick={handleDiscard}>
              Discard
            </button>
            <button onClick={handleContinueEdit}>Continue editing</button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body") as Element | DocumentFragment
  );
