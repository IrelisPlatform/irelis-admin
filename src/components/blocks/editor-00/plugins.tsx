import { useState } from "react"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"

import { ContentEditable } from "@/components/editor/editor-ui/content-editable"
import {BlockFormatDropDown} from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import {ToolbarPlugin} from "@/components/editor/plugins/toolbar/toolbar-plugin";
import {FormatParagraph} from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import {FormatHeading} from "@/components/editor/plugins/toolbar/block-format/format-heading";
import {FormatNumberedList} from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import {FormatBulletedList} from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import {FormatCheckList} from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import {FormatQuote} from "@/components/editor/plugins/toolbar/block-format/format-quote";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {CheckListPlugin} from "@lexical/react/LexicalCheckListPlugin";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {HistoryToolbarPlugin} from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import {FontFormatToolbarPlugin} from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import {ElementFormatToolbarPlugin} from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import {TabIndentationPlugin} from "@lexical/react/LexicalTabIndentationPlugin";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}
        <ToolbarPlugin>
            {({ blockType }) => (
                <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
                    <BlockFormatDropDown>
                        <FormatParagraph />
                        <FormatHeading levels={["h1", "h2", "h3"]} />
                        <FormatNumberedList />
                        <FormatBulletedList />
                        <FormatCheckList />
                        <FormatQuote />
                    </BlockFormatDropDown>
                    <HistoryToolbarPlugin />
                    <FontFormatToolbarPlugin />
                    <ElementFormatToolbarPlugin />
                </div>

            )}
        </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Tapez ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
          <ListPlugin />
          <CheckListPlugin />
          <HistoryPlugin />
          <TabIndentationPlugin />
      </div>
      {/* actions plugins */}
    </div>
  )
}
