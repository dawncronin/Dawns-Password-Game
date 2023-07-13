

export default function Error(err: string) {
    return (
            <h4 key={err}>
                {err}
            </h4>
    )
}