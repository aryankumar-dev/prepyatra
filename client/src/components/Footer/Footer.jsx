function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-center sm:text-left">
                    <span className="text-lg font-extrabold text-primary">PrepYatra</span>
                    <p className="text-sm text-muted-foreground">By Aryan Kumar</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    Built with ❤️ by <span className="font-bold text-primary">Aryan Kumar</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
