/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Link from "@docusaurus/Link";
import DocPaginator from "@theme/DocPaginator";
import DocVersionSuggestions from "@theme/DocVersionSuggestions";
import Seo from "@theme/Seo";
import LastUpdated from "@theme/LastUpdated";
import TOC from "@theme/TOC";
import classnames from "classnames";
import EditThisPage from "@theme/EditThisPage";
import clsx from "clsx";
import styles from "./styles.module.css";
import {
  useActivePlugin,
  useVersions,
  useActiveVersion,
} from "@theme/hooks/useDocs";

function APIDocItem(props) {
  const { content: DocContent } = props;
  const {
    metadata,
    frontMatter: {
      image,
      keywords,
      hide_title: hideTitle,
      hide_table_of_contents: hideTableOfContents,
    },
  } = DocContent;
  const {
    description,
    title,
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    source,
  } = metadata;
  const issueTitle = `Issue with "${title}" in ${source}`;
  const issueUrl = `https://github.com/PaloAltoNetworks/prisma.pan.dev/issues/new?labels=documentation&template=developer-documentation-issue.md&title=${issueTitle}`;

  const { pluginId } = useActivePlugin({
    failfast: true,
  });
  const versions = useVersions(pluginId);
  const version = useActiveVersion(pluginId); // If site is not versioned or only one version is included
  // we don't show the version badge
  // See https://github.com/facebook/docusaurus/issues/3362

  const showVersionBadge = versions.length > 1;
  return (
    <>
      <Seo
        {...{
          title,
          description,
          keywords,
          image,
        }}
      />

      <div className="row">
        <div
          className={clsx("col", {
            [styles.docItemCol]: !hideTableOfContents,
          })}
        >
          <DocVersionSuggestions />
          <div className={styles.docItemContainer}>
            <article>
              {showVersionBadge && (
                <div>
                  <span className="badge badge--secondary">
                    Version: {version.label}
                  </span>
                </div>
              )}
              {!hideTitle && (
                <header>
                  <h1 className={styles.docTitle}>{title}</h1>
                </header>
              )}
              <div className="markdown">
                <DocContent />
              </div>
            </article>
            {(editUrl || lastUpdatedAt || lastUpdatedBy) && (
              <div className="margin-vert--xl">
                <div className="row">
                  <div className="col">
                    {editUrl && <EditThisPage editUrl={editUrl} />}
                  </div>
                  {(lastUpdatedAt || lastUpdatedBy) && (
                    <LastUpdated
                      lastUpdatedAt={lastUpdatedAt}
                      formattedLastUpdatedAt={formattedLastUpdatedAt}
                      lastUpdatedBy={lastUpdatedBy}
                    />
                  )}
                </div>
                <div className="row">
                  <div className="col text--right">
                    <Link
                      className={classnames(
                        "button button--outline button--primary button--md"
                      )}
                      href={issueUrl}
                      target="_blank"
                    >
                      Report an Issue
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <div className="margin-vert--lg">
              <DocPaginator metadata={metadata} />
            </div>
          </div>
        </div>
        {!hideTableOfContents && DocContent.toc && (
          <div className="col col--3">
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </>
  );
}

export default APIDocItem;
