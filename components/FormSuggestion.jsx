import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Suggestion</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        {/* Description */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description {` `}
          </span>
          <textarea
            value={post.description}
            onChange={(e) =>
              setPost({
                ...post,
                description: e.target.value,
              })
            }
            rows="8"
            placeholder="The logo should be further to the right!"
            className="form_input"
          />
        </label>

        {type === "Create" ? (
          <input type="text" hidden value={post.status} />
        ) : (
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Status {` `}
            </span>
            <input
              value={post.status}
              onChange={(e) =>
                setPost({
                  ...post,
                  status: e.target.value,
                })
              }
              placeholder="Finished!"
              className="form_input"
            />
          </label>
        )}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
