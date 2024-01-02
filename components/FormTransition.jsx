import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Transition</span>
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
          <input
            value={post.description}
            onChange={(e) =>
              setPost({
                ...post,
                description: e.target.value,
              })
            }
            placeholder="I ate a sandwich for lunch"
            className="form_input"
          />
        </label>

        {/* Tag */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
          </span>
          <input
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
            placeholder="#Food"
            className="form_input"
          />
        </label>

        {/* Value */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Value {` `}
          </span>
          <input
            value={post.value}
            onChange={(e) =>
              setPost({
                ...post,
                value: e.target.value,
              })
            }
            placeholder="$ 0.00"
            className="form_input"
          />
        </label>

        {/* Date */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Date {` `}
          </span>
          <input
            type="date"
            className="form_input"
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
          />
        </label>

        {/* Type */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Type {` `}
          </span>

          <select
            onChange={(e) => {
              setPost({
                ...post,
                type: e.target.value,
              });
            }}
            value={post.type}
            placeholder="#Tag"
            className="form_input"
          >
            <option value="" hidden disabled>
              {" "}
              Select{" "}
            </option>
            <option value="I">Income</option>
            <option value="E">Expenses</option>
          </select>
        </label>

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
