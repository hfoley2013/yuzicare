import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";
import MailingListOptin from "./partials/MailingListOptin";
import { useModalContext } from "context/ModalContext";


const PostSingle = ({ frontmatter, content, mdxContent }) => {
  let { description, title, image, meta_title, canonical, noindex } = frontmatter;
  description = description ? description : content.slice(0, 120);
  const { isVisible, openModal, closeModal } = useModalContext();


  return (
    <Base title={title} description={description} meta_title={meta_title} canonical={canonical} noindex={noindex} image={image} openModalFunction={openModal}>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="mx-auto text-center col-12 md:col-8">
              {image && (
                <Image
                  src={image}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  className="rounded-lg"
                />
              )}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}

              <div className="mb-16 text-left content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>
      {isVisible && (
        <section className="z-10 flex items-center justify-center w-full h-screen">
          <MailingListOptin
            onClose={closeModal}
          />
        </section>
      )}
    </Base>
  );
};

export default PostSingle;
