import classes from "./FilePicker.module.css";
import { useRef } from "react";
import * as React from "react";
import type { Children } from "../../models/typesUI.ts";

import { readFiles } from "../../util/readFiles.ts";
import { useMutation } from "@tanstack/react-query";
import { postUploadFiles, queryClient } from "../../services/client.ts";

export default function FilePicker({ children }: Children) {
  const { mutate, } = useMutation({
    mutationFn: postUploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  function handleBtnClick() {
    inputRef.current?.click();
  }

  async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const projects = await readFiles(event);
    if (projects) {
      mutate(projects);
    }
    event.target.value = "";
  }

  return (
    <div className={classes.picker}>
      <input
        className={classes.input}
        ref={inputRef}
        onChange={handleInputChange}
        type="file"
        accept=".vtt, .srt, text/vtt, application/x-subrip"
        multiple
      />
      <div className={classes.wrapper} onClick={handleBtnClick}>
        {children}
      </div>
    </div>
  );
}
